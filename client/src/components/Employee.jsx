import avatar from "../assets/avatar.png";
import logo from "../assets/logo.png";

export default function Employee({
  employeeName,
  employeeImage,
  clickable = false,
}) {
  return (
    <div
      className={`flex flex-col relative items-center space-y-5 hover transition duration-200 ${
        clickable ? "cursor-pointer hover:scale-105 relative" : ""
      } `}
    >
      <img
        src={employeeImage || avatar}
        alt="Employee avatar"
        className="w-full relative max-w-[150px] md:max-w-[200px]  rounded-xl mask-linear-50 mask-linear-from-80% mask-linear-to-99%"
      />
      <img
        src={logo}
        alt="Kastom"
        className="w-[30px] absolute top-2 right-2 "
      />
      <h4 className="text-xl md:text-2xl">{employeeName}</h4>
    </div>
  );
}
