export type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  city: string;
  country: string;
  phone: string;
  street: string;
  zipCode: string;
};


export const newUser1: UserData = {
  firstName: "Ross",
  lastName: "Geller",
  email: getEnv("NEW_USER_1_EMAIL"),
  password: getEnv("NEW_USER_1_PASSWORD"),
  city: "Dnipro",
  country: "Ukraine",
  phone: "+380345678901",
  street: "123 Main St",
  zipCode: "10001"
};

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
}