import Employee from "../models/employees.model.js";

export const getEmployee = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    console.log(`Error in fetching Employees: `, error.message);
    res
      .status(500)
      .json({ succes: false, message: "Server GET Employees error" });
  }
};

export const postEmployee = async (req, res) => {
  const employee = req.body;
  if (!employee.employeeName) {
    return res
      .status(400)
      .json({ message: "Пожалуйста, напишите имя сотрудника" });
  }
  const newEmployee = new Employee(employee);
  try {
    await newEmployee.save();
    res.status(201).json({ success: true, data: newEmployee });
  } catch (error) {
    console.error("Error in creating Employee: ", error.message);
    res.status(300).json({ succes: false, message: "Server error" });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  console.log(`Employee id:`, id);

  try {
    await Employee.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Employee deleted" });
  } catch (error) {
    console.log("Error in deleting Employee: ", error.message);
    res.status(404).json({ succes: false, message: "Employee was not found" });
  }
};
