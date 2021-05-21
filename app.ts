class HashTable {
  table = new Array(3);
  private qtyItems = 0;

  private hashKey(key: string | number, size: number) {
    if (typeof key === 'number') {
      return key % size;
    }

    let hashIndex = 2;

    for (let i = 0; i < key.length; i++) {
      hashIndex = (13 * hashIndex * key.charCodeAt(i)) % size;
    }

    return hashIndex;
  }

  private resize = () => {
    const newHashTable = new Array(this.table.length * 2);
    this.table.forEach(item => {
      if (item) {
        item.forEach(([key, value]: [key: number | string, value: any]) => {
          const index = this.hashKey(key, newHashTable.length);
          if (newHashTable[index]) {
            newHashTable[index].push([key, value]);
          } else {
            newHashTable[index] = [[key, value]];
          }
        });
      }
    });
    this.table = newHashTable;
  };


  getItem(key: string | number) {
    const index = this.hashKey(key, this.table.length);

    if (index >= 0) {
      const item = this.table[index].find((x: any) => x[0] === key);

      return item ? item[1] : "Item doesn't exists";
    }
  }

  setItem(key: string | number, value: any) {
    this.qtyItems++;

    const loadFactor = this.qtyItems / this.table.length;

    if (loadFactor > 0.8) {
      this.resize();
    }

    const index = this.hashKey(key, this.table.length);

    if (index >= 0) {
      if (![null, undefined].includes(this.table[index])) {
        this.table[index].push([key, value]);
        return;
      }

      this.table[index] = [[key, value]];
    }
  }
}

const table = new HashTable();
table.setItem('firstName', 'Luis');
console.log(table.table.length);
table.setItem('middleName', 'Filipe');
console.log(table.table.length);
table.setItem('age', '24');
console.log(table.table.length);
table.setItem('some', 'thing');
console.log(table.table.length);

console.log(table.getItem('firstName'));
console.log(table.getItem('middleName'));
console.log(table.getItem('age'));
console.log(table.getItem('some'));