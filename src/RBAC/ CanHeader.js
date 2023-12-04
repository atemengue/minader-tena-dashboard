const check = (role) => {
  if (role === "super_admin") {
    return true;
  }
  return false;
};

const CanHeader = (props) => (check(props.role) ? props.yes() : props.no());

CanHeader.delaultProps = {
  yes: () => null,
  no: () => null,
};

export default CanHeader;
