var person = {
    name: 'Ibrahim'
};

person.age = 21;

debugger;

person.name = 'Ahmet';

console.log(person);

/**
 * Debugging Mode command
 * 
 * list(10) => 10 satır görüntüler
 * n => next 
 * c => continued
 * repl => debug moddan çıkıp o ana kadar üretilmiş verileri test etmemize imkan sağlar
 */

 /**
  * node inspect debugging.js
  * 
  * chrpme dev tools ile çalışmak istersek;
  * node --inspect-brk debugging.js
  * chrome://inspect
  */