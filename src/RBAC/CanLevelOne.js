const check = (role) => {
  if (role === "user_avancé" || role === "admin" || role === "super_admin") {
    return true;
  }
  return false;
};

const CanLevelOne = (props) => (check(props.role) ? props.yes() : props.no());

CanLevelOne.delaultProps = {
  yes: () => null,
  no: () => null,
};

export default CanLevelOne;
