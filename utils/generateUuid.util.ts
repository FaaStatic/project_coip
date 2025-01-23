import { v4 as uuidv4 } from 'uuid';

export const GenerateUid = {
  Uuid32Bit: () => {
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
      (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
    );
  },
  GeneratorUuid: (lengthUuid: number) => {
    const uuid = uuidv4();
    return uuid.replace(/-/g, '').substring(0, lengthUuid);
  },

  generateNumericUUID: (length) => {
    if (length <= 0) {
      throw new Error('Length must be a positive integer');
    }

    // Generate a UUID
    const uuid = uuidv4();

    // Remove all non-numeric characters
    let numericUUID = uuid.replace(/[^0-9]/g, '');

    // If the numeric UUID is shorter than the requested length, pad with leading zeros
    if (numericUUID.length < length) {
      numericUUID = numericUUID.padStart(length, '0');
    }

    // If the numeric UUID is longer than the requested length, truncate it
    if (numericUUID.length > length) {
      numericUUID = numericUUID.substring(0, length);
    }

    return numericUUID;
  },
};
