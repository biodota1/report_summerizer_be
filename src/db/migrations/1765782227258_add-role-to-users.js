exports.up = async (pgm) => {
  pgm.addColumn("users", {
    role: {
      type: "varchar(50)",
      notNull: true,
      default: "user",
    },
  });
};

exports.down = async (pgm) => {
  pgm.dropColumn("users", "role");
};
