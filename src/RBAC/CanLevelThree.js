const check = (role) => {
  if (role === "super_admin") {
    return true;
  }
  return false;
};

const CanLevelThree = (props) => (check(props.role) ? props.yes() : props.no());

CanLevelThree.delaultProps = {
  yes: () => null,
  no: () => null,
};

export default CanLevelThree;
