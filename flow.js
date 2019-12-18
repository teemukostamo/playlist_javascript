// @flow

// VARIABLES
let name: string = 'John Doe';
let age: number = 30;
let something: any = [1, 2, 3];
let arrayOfStrings: string[] = ['Name', 'Name', 'Name'];
let arrayOfNumbers: number[] = [1, 2, 3];

let hasKids: boolean;

// INTERFACE
let person: Person;

person = {
  name: 'John',
  age: 30,
  hasKids: false
};
interface Person {
  name: string;
  age: number;
  hasKids?: boolean;
}

// FUNCTIONS
function greeting(name: string): string {
  return 'Hello' + name;
}

console.log(greeting('Brad'));

function someFunction(value: string | number) {
  return 'Hello';
}

// utility types
type Suit = 'Diamonds' | 'Clubs' | 'Spades';

const clubs: Suit = 'Clubs';
