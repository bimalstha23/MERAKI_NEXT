export const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    background: "#FFFFFF",
    boxShadow: "inset 0px 0px 5.83291px rgba(0, 0, 0, 0.1)",
    borderRadius: "7.29114px",
    borderColor: state.isFocused ? "#FB2448" : provided.borderColor,
    "&:hover": {
      borderColor: state.isFocused ? "#FB2448" : provided.borderColor,
    },
    minWidth: "200px", // Set the desired fixed width
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    background: state.isSelected ? "#FB2448" : "#FFFFFF",
    color: state.isSelected ? "#FFFFFF" : "#000000",
    borderColor: state.isFocused ? "#FB2448" : provided.borderColor,
    "&:hover": {
      borderColor: state.isFocused ? "#FB2448" : provided.borderColor,
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#000000",
  }),
};

export const inputSelect = {
  control: (provided: any, state: any) => ({
    ...provided,
    background: "#FFFFFF",
    borderRadius: "7.29114px",
    borderColor: state.isFocused ? "#FB2448" : "#121212",
    "&:hover": {
      borderColor: state.isFocused ? "#FB2448" : "#121212",
    },
    "&:focus": {
      borderColor: state.isFocused ? "#FB2448" : "#121212",
    },
    minWidth: "200px", // Set the desired fixed width
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    background: state.isSelected ? "#FB2448" : "#FFFFFF",
    color: state.isSelected ? "#FFFFFF" : "#000000",
    borderColor: state.isFocused ? "#FB2448" : "#121212",
    "&:hover": {
      borderColor: state.isFocused ? "#FB2448" : "#121212",
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#000000",
  }),
};
