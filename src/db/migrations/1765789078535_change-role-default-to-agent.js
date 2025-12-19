exports.up = async (pgm) => {
  pgm.sql(`UPDATE users SET role = 'agent' WHERE role = 'user'`);

  pgm.alterColumn("users", "role", { default: "agent" });
};

exports.down = async (pgm) => {
  pgm.alterColumn("users", "role", { default: "user" });
};
