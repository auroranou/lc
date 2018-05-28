/**
 * https://leetcode.com/problems/merge-two-sorted-lists/description/
 * 
 * Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.
 * 
 * Example:
 * Input: 1->2->4, 1->3->4
 * Output: 1->1->2->3->4->4
*/

// Definition for singly-linked list.
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
@param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  // New list node to hold the merged list
  let head = new ListNode(0);

  // Helper node to iterate through lists
  let current = head;

  // While nodes remain in l1 AND l2
  while (l1 && l2) {
    console.log(`comparing ${l1.val} and ${l2.val}`);
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }

    current = current.next;
    console.log('-->', current.val);
  }

  // If there are still nodes remaining in l1 or l2, append them
  if (l1) {
    current.next = l1;
  } else if (l2) {
    current.next = l2;
  }
  console.log('-->', current.next.val);

  // Return head.next instead of head because head.val = 0
  return head.next;
};

/**
 * Helper function to convert an array into a linked list
 * (where arr[0] is the ListNode head)
 * 
 * @param {Array<any>} arr 
 */
const arrToList = (arr) => {
  if (arr.length === 0) return {};

  return arr.reduceRight((memo, curr, i) => {
    const nextIsNull = i === arr.length - 1;

    return {
      val: curr,
      next: nextIsNull ? null : memo
    };
  }, {});
}

/**
 * Helper function to convert a linked list back to an array of values
 * 
 * @param {ListNode} linkedList 
 */
const listToArr = (linkedList) => {
  const arr = [];

  while (linkedList.next) {
    arr.push(linkedList.val);
    linkedList = linkedList.next;
  }

  return arr;
}

const ans = mergeTwoLists(arrToList([1, 2, 3]), arrToList([1, 2, 4]));
console.log(JSON.stringify(ans));