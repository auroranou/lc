'use strict';
const assert = require('assert');

/*
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example:
  Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
  Output: 7 -> 0 -> 8
  Explanation: 342 + 465 = 807
*/

// Definition for singly-linked list.
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let carry = 0;
  let ans = new ListNode(0);
  const head = ans;

  while ((l1 !== null && l1.val !== null) || (l2 !== null && l2.val !== null)) {
    // Get number in ones position for current ans.val
    const sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;
    const val = sum % 10;

    // If there's a carry left over from last loop, add it
    ans.next = new ListNode(val);

    // Reset the carry if the current sum has two digits
    carry = (sum >= 10) ? 1 : 0;

    ans = ans.next;
    if (l1 !== null) l1 = l1.next;
    if (l2 !== null) l2 = l2.next;
  }

  // If the remaining carry is > 1, add it as a final list node
  if (carry > 0) {
    ans.next = new ListNode(carry);
  }

  return head.next;
};

function test() {
  const l1 = new ListNode(2);
  l1.next = new ListNode(4);
  l1.next.next = new ListNode(3);

  const l2 = new ListNode(5);
  l2.next = new ListNode(6);
  l2.next.next = new ListNode(4);

  const expected = new ListNode(7);
  expected.next = new ListNode(0);
  expected.next.next = new ListNode(8);

  const ans = addTwoNumbers(l1, l2);
  assert.deepEqual(ans, expected);
  console.log('base test passes');
}

function testEmptyLists() {
  const l1 = new ListNode(0);
  const l2 = new ListNode(0);
  assert.deepEqual(addTwoNumbers(l1, l2), new ListNode(0));
  console.log('empty list test passes');
}

function testUnevenLists() {
  const l1 = new ListNode(2);
  l1.next = new ListNode(4);
  l1.next.next = new ListNode(3);

  const l2 = new ListNode(5);
  l2.next = new ListNode(6);

  const expected = new ListNode(7);
  expected.next = new ListNode(0);
  expected.next.next = new ListNode(4);

  const ans = addTwoNumbers(l1, l2);
  assert.deepEqual(ans, expected);
  console.log('uneven lists test passes');
}

function testHangingCarry() {
  const l1 = new ListNode(2);
  l1.next = new ListNode(4);
  l1.next.next = new ListNode(3);

  const l2 = new ListNode(5);
  l2.next = new ListNode(4);
  l2.next.next = new ListNode(7);

  const expected = new ListNode(7);
  expected.next = new ListNode(8);
  expected.next.next = new ListNode(0);
  expected.next.next.next = new ListNode(1);

  const ans = addTwoNumbers(l1, l2);
  assert.deepEqual(ans, expected);
  console.log('carry test passes');
}

function testUnevenCarry() {
  const l1 = new ListNode(1);

  const l2 = new ListNode(9);
  l2.next = new ListNode(9);

  const expected = new ListNode(0);
  expected.next = new ListNode(0);
  expected.next.next = new ListNode(1);

  const ans = addTwoNumbers(l1, l2);
  assert.deepEqual(ans, expected);
  console.log('carry test passes');
}

test();
testEmptyLists();
testUnevenLists();
testHangingCarry();
testUnevenCarry();