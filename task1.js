class Good {
    constructor (id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }

    setAvailable (available) {
        this.available = available;
    }
};

class GoodsList {
    #goods = []

    constructor (sortPrice, sortDir, filter='.+') {
        this.filter = new RegExp(`${filter}`,'i');
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    get list () {
        let filteredList = this.#goods.filter(item => item.name.match(this.filter))
        return this.sortPrice ? filteredList.sort((obj1, obj2) => this.sortDir ? obj1.price - obj2.price : obj2.price - obj1.price) : filteredList
    }

    add (good) {
        if (good.constructor.name == 'Good' && this.#goods.findIndex(item => item == good) === -1) {
            this.#goods.push(good)
        }
    }

    remove (goodId) {
        for (let i = 0; i <= this.#goods.length - 1; i++) {
            if (this.#goods[i].id == goodId) {
                this.#goods.splice(i, 1)
            }
        }
    }
};

class BasketGood extends Good {
    constructor(good) {
        super(good.id, good.name, good.description, good.sizes, good. price, good.available)
        this.amount = 0
    }
}

class Basket {
    constructor() {
        this.goods = []
    }

    get totalAmount() {
        return this.goods.map(item => item.price * item.amount).reduce((accumulator, value) => accumulator + value)
    }

    get totalSum() {
        return this.goods.reduce((accumulator, item) => accumulator + item.amount, 0)
    }

    add(good, amount) {
        if (good.constructor.name === 'BasketGood' && amount > 0) {
            good.amount += amount
            if (this.goods.findIndex(item => item === good) === -1) {
                this.goods.push(good)
            }
        }
    }

    remove(good, amount) {
        let goodId = this.goods.findIndex(item => item === good)
        if (goodId !== -1) {
            (good.amount - amount) > 0 ? good.amount -= amount : this.goods.splice(goodId, 1)
        }
    }

    clear() {
        this.goods.splice(0, this.goods.length)
    }

    removeUnavailable() {
        this.goods = this.goods.filter(item => item.available)
    }
}

// Create goods object
const tshirt = new Good(1, 'T-shirt', 'Cool for summer!', ['S', 'M', 'L', 'XL'], 500, true)
const dress = new Good(2, 'Dress', "It's for women (not always)...", ['S', 'M', 'L', 'XL'], 1000, true)
const pants = new Good(3, 'Pants', 'For buisnessmen.', ['S', 'M', 'L', 'XL'], 1500, false)
const skirt = new Good(4, 'Skirt', 'So short!', ['S', 'M', 'L', 'XL'], 100, true)
const jeans = new Good(5, 'Jeans', 'Unisex!', ['S', 'M', 'L', 'XL'], 800, true)

// Create catalog object
const catalog = new GoodsList(false, true)

// Create basket item
const basketItem1 = new BasketGood(tshirt)
const basketItem2 = new BasketGood(dress)
const basketItem3 = new BasketGood(pants)
const basketItem4 = new BasketGood(skirt)
const basketItem5 = new BasketGood(jeans)

// Create basket
const basket = new Basket()

// Add goods to catalog
catalog.add(tshirt)
catalog.add(dress)
catalog.add(pants)
catalog.add(skirt)
catalog.add(jeans)

// Test call
console.log(catalog.list)
catalog.remove(4)
console.log(catalog.list)
catalog.sortPrice = true
console.log(catalog.list)
catalog.sortDir = false
console.log(catalog.list)
catalog.sortPrice = false
console.log(catalog.list)
basket.add(basketItem2, 7)
console.log(basket)
basket.add(basketItem4, 12)
console.log(basket)
basket.remove(basketItem2, 3)
console.log(basket)
basket.removeUnavailable()
console.log(basket)
console.log(basket.totalAmount)
console.log(basket.totalSum)
basket.clear()
console.log(basket)

