const check = (role) => {
  if (role === "admin" || role === "super_admin") {
    return true;
  }
  return false;
};

const Can = (props) => (check(props.role) ? props.yes() : props.no());

Can.delaultProps = {
  yes: () => null,
  no: () => null,
};

export default Can;
