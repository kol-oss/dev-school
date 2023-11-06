'use strict';

class PaginationHelper {
    itemsList;
    itemsOnOnePage;
    constructor(items, itemsOnOnePage) {
        this.itemsList = items;
        this.itemsOnOnePage = itemsOnOnePage;
    }
    pageCount() {
        return Math.ceil(this.itemCount() / this.itemsOnOnePage);
    }
    itemCount() {
        return this.itemsList.length;
    }
    pageItemCount(pageIndex) {
        const itemsLength = this.itemCount();

        if (pageIndex < 0 || pageIndex >= this.pageCount()) {
            return -1;
        }

        const itemsOnRequiredPages = (pageIndex + 1) * this.itemsOnOnePage;

        return itemsOnRequiredPages <= itemsLength ? this.itemsOnOnePage : itemsLength % this.itemsOnOnePage;

    }
    pageIndex(itemIndex) {
        if (itemIndex >= this.itemCount() || itemIndex < 0) return -1;

        return Math.floor(itemIndex / this.itemsOnOnePage);
    }
}

// USAGE + EXAMPLES
{
    const pagHelper = new PaginationHelper(['a','b','c','d','e','f'], 4);
    console.log(pagHelper.pageCount()); // 2
    console.log(pagHelper.itemCount()); // 6

    console.log(pagHelper.pageItemCount(1)); // 2

    console.log(pagHelper.pageIndex(5)); // 1
    console.log(pagHelper.pageIndex(-10)); // -1
}