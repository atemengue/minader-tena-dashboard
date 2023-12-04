const check = (role) => {
  if (role === "admin" || role === "super_admin") {
    return true;
  }
  return false;
};

const CanLevelTwo = (props) => (check(props.role) ? props.yes() : props.no());

CanLevelTwo.delaultProps = {
  yes: () => null,
  no: () => null,
};

export default CanLevelTwo;
