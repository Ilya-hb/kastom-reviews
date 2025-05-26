import cloudinary from "../middleware/upload.js";
import Employee from "../models/employee.model.js";

export const getEmployee = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    console.log(`Error in fetching Employees: `, error.message);
    res
      .status(500)
      .json({ success: false, message: "Server GET Employees error" });
  }
};

export const getEmployeeByID = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate("reviews");
    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    console.log(`Error in getting employee by ID`, error.message);
    res
      .status(500)
      .json({ success: false, message: "Server GET Employee by ID error" });
  }
};

export const postEmployee = async (req, res) => {
  const { employeeName } = req.body;
  console.log(req.body);
  console.log(req.file);

  if (!employeeName) {
    return res
      .status(400)
      .json({ message: "Пожалуйста, напишите имя сотрудника" });
  }
  try {
    const newEmployee = new Employee({
      employeeName,
      employeeImage: req.file?.path || null,
      employeeImagePublicId: req.file?.filename || null,
    });
    await newEmployee.save();
    res.status(201).json({ success: true, data: newEmployee });
  } catch (error) {
    console.error("Error in creating Employee: ", error.message);
    res.status(300).json({ success: false, message: "Server error" });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { employeeName } = req.body;

  try {
    const employee = await Employee.findById(id);
    if (!employee)
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    employee.employeeName = employeeName;
    if (req.file) {
      if (employee.employeeImagePublicId)
        await cloudinary.uploader.destroy(employee.employeeImagePublicId);
      employee.employeeImage = req.file.path;
      employee.employeeImagePublicId = req.file.filename;
    }
    await employee.save();
    return res.status(200).json({ success: true, data: employee });
  } catch (error) {
    console.log("Error in updatind employee:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error in updating data" });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  console.log(`Employee id:`, id);

  try {
    const employee = await Employee.findById(id);
    if (!employee)
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });

    if (employee.employeeImagePublicId) {
      await cloudinary.uploader.destroy(employee.employeeImagePublicId);
    }

    await Employee.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Employee deleted" });
  } catch (error) {
    console.log("Error in deleting Employee: ", error.message);
    res.status(404).json({ success: false, message: "Employee was not found" });
  }
};
