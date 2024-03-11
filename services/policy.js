const Agent = require("../models/agent");
const Carrier = require("../models/carrier");
const Lob = require("../models/lob");
const User = require("../models/user");
const UserAccount = require("../models/userAccount");
const Policy = require("../models/policy");
const fs = require("fs");
const csv = require("csv-parser");
const xlsx = require("xlsx");
const { Worker, isMainThread, parentPort } = require("worker_threads");

exports.uploadFile = async (req) => {
  try {
    if (isMainThread) {
      const worker = createWorker();

      const fileExtension = getFileExtension(req.file.path);

      if (fileExtension === "csv") {
        fs.createReadStream(req.file.path)
          .pipe(csv())
          .on("data", async (row) => {
            await processRow(row);
          })
          .on("end", () => {
            worker.postMessage({ done: true });
            console.log("CSV processing complete.");
          });
      } else if (fileExtension === "xlsx") {
        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);

        (async () => {
          for (const row of data) {
            await processRow(row);
          }
          worker.postMessage({ done: true });
          console.log("Excel processing complete.");
        })();
      } else {
        console.error("Unsupported file format.");
      }
    } else {
      parentPort.on("message", (message) => {
        if (message.done) {
          process.exit(0);
        }
      });
    }
  } catch (error) {}
};

const insertDocuments = async (model, documents) => {
  try {
    await model.insertMany(documents);
  } catch (error) {
    console.error(
      `Error inserting documents into model ${model.modelName}:`,
      error
    );
  }
};

const processRow = (row) => {
  return new Promise((resolve) => {
    const agent = new Agent({ agentName: row.agent });
    const user = new User({
      firstName: row.firstname,
      dob: new Date(row.dob),
      address: row.address,
      phoneNumber: row.phone,
      state: row.state,
      zipCode: row.zip,
      email: row.email,
      gender: row.gender,
      userType: row.userType,
    });
    const userAccount = new UserAccount({ accountName: row.account_name });
    const policyCategory = new Lob({ categoryName: row.category_name });
    const policyCarrier = new Carrier({ companyName: row.company_name });
    const policyInfo = new Policy({
      policyNumber: row.policy_number,
      policyStartDate: new Date(row.policy_start_date),
      policyEndDate: new Date(row.policy_end_date),
      policyCategory: policyCategory._id,
      premiumAmount: row.premium_amount,
      companyCollectionId: policyCarrier._id,
      userId: user._id,
    });

    insertDocuments(Agent, [agent]);
    insertDocuments(User, [user]);
    insertDocuments(UserAccount, [userAccount]);
    insertDocuments(Lob, [policyCategory]);
    insertDocuments(Carrier, [policyCarrier]);
    insertDocuments(Policy, [policyInfo]).then(resolve);
  });
};

const createWorker = () => {
  return new Worker(__filename, { workerData: { isWorker: true } });
};

const getFileExtension = (filename) => {
  return filename.split(".").pop().toLowerCase();
};

exports.searchPolicyInfo = async (filter) => {
  try {
    const user = await User.findOne(filter);

    if (!user) {
      throw new Error("User not found");
    }

    const policyInfo = await Policy.findOne({ userId: user._id })
      .populate("policyCategory")
      .populate("companyCollectionId");

    return policyInfo;
  } catch (error) {
    throw new Error("Error searching policy info: " + error.message);
  }
};

// fetch aggregated policy by each user
exports.aggregatePolicy = async () => {
  try {
    const aggregatedData = await Policy.aggregate([
      {
        $group: {
          _id: "$userId",
          policies: {
            $push: "$$ROOT",
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          _id: 0,
          _id: "$_id",
          user: { $arrayElemAt: ["$user", 0] },
          policies: 1,
        },
      },
    ]);

    return aggregatedData;
  } catch (error) {
    throw new Error("Error aggregating policy data: " + error.message);
  }
};
