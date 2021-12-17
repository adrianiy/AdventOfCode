import { decrypt, decryptValues } from './day16';

//test('decrypt hexadecimal test', () => {
    //const decrypted = decrypt('./21/day16/input_test.txt');
    //const decrypted2 = decrypt('./21/day16/input_test2.txt');
    //const decrypted3 = decrypt('./21/day16/input_test3.txt');
    //const decrypted4 = decrypt('./21/day16/input_test4.txt');
    //const decryptedValues = decryptValues('./21/day16/input_test5.txt');
    //const decryptedValues2 = decryptValues('./21/day16/input_test6.txt');
    //const decryptedValues3 = decryptValues('./21/day16/input_test7.txt');
    //const decryptedValues4 = decryptValues('./21/day16/input_test8.txt');
    //const decryptedValues5 = decryptValues('./21/day16/input_test9.txt');
    //const decryptedValues6 = decryptValues('./21/day16/input_test10.txt');
    //const decryptedValues7 = decryptValues('./21/day16/input_test11.txt');
    //const decryptedValues8 = decryptValues('./21/day16/input_test12.txt');

    //expect(decrypted).toEqual(16);
    //expect(decrypted2).toEqual(12);
    //expect(decrypted3).toEqual(23);
    //expect(decrypted4).toEqual(31);
    //expect(decryptedValues).toEqual(3);
    //expect(decryptedValues2).toEqual(54);
    //expect(decryptedValues3).toEqual(7);
    //expect(decryptedValues4).toEqual(9);
    //expect(decryptedValues5).toEqual(1);
    //expect(decryptedValues6).toEqual(0);
    //expect(decryptedValues7).toEqual(0);
    //expect(decryptedValues8).toEqual(1);
//})

test('decrypt hexadecimal result', () => {
    const input = './21/day16/input.txt';
    const decrypted = decrypt(input);
    const decryptedValues = decryptValues(input);

    console.log(decryptedValues);
    expect(decrypted).toBeDefined();
    expect(decryptedValues).toBeDefined();
})
