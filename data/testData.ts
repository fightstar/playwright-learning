import { faker } from '@faker-js/faker';

const month = faker.number.int({ min: 1, max: 12 }).toString().padStart(2, '0');
const year = faker.number.int({ min: 27, max: 35 }).toString();
const cardExpiredDate = `${month}/${year}`;

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
}

export type CardData =
{
  cardNumberField: string;
  expireDate: string;
  cvvCode: string;
}


export const newUser1 : UserData = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email().toLowerCase(),
  password:faker.internet.password(),
  city: faker.location.city(),
  country: "Ukraine",
  phone: "+380662589787",
  street: faker.location.streetAddress(),
  zipCode: "65611",
}

export const cardData: CardData =
{

  cardNumberField: faker.finance.creditCardNumber('################'),
  expireDate: cardExpiredDate,
  cvvCode: faker.finance.creditCardCVV()
}

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
}