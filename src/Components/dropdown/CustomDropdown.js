import Dropdown from "react-bootstrap/Dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";

function CustomDropdown() {
  const dropdownlist = [
    {
      title: "View",
      type: "view",
    //   icon: <MdRemoveRedEye size={20} />,
    },
    {
      title: "Edit",
      type: "edit",
    //   icon: <MdMode size={20} />,
    },
    {
      title: "Change Status",
      type: "status",
    //   icon: <MdToggleOn size={20} />,
    },
    {
      title: "Delete",
      type: "delete",
    //   icon: <MdDelete size={20} />,
    },
  ];
  return (
    <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        <BsThreeDotsVertical />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {dropdownlist.map((el, id) => {
          return (
            <Dropdown.Item key={id} href="#/action-1">
              {el.icon} {el.title}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CustomDropdown;
