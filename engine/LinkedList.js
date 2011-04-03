/**
 *	Generic Linked List implementation. In the Valhalla project it is used
 *	to store lists of particles in an iterator.
 */

function ListNode (data) {
	this.data = data;
}

ListNode.prototype = {
	data : null,
	next : null
};

function LinkedList () {}

LinkedList.prototype = {
	length : 0,
	head : null
}

/*
 * Returns the list as a strings
 */
LinkedList.prototype.list2string = function() {
	var str = '';
	var iter = this.head;
	while(iter != null) {
		str += iter.data + ", ";
		iter = iter.next;
	}

	return str;
}

/*
 * Remove an element from the list. If only one parameter is supplied it is used
 * as the INDEX of the element to be removed. If checkData is also passed AND is true
 * num will be treated as the VALUE of the element to be removed, ie the first element
 * encountered whos value equals num will be removed.
 */
LinkedList.prototype.remove = function (num, checkData) {
	if(this.length == 0) return false;

	if(checkData) {
		var iter = this.head;
		if(num == this.head.data) {
			this.head = this.head.next;
			this.length--;
			return true;
		}
		else {
			while(iter.next != null && iter.next.data != num) {
				iter = iter.next;
			}

			if(iter.next == null) {
				return false;
			} else {
				iter.next = iter.next.next;
				this.length--;
				return true;
			}
		}
	}
	else {
		if(num > this.length) return false;
		if(num == 0) {
			this.head = this.head.next;
			this.length--;
			return true;
		}

		iter = this.head;
		var i = 0;
		while(i < num-1) {
			iter = iter.next;
			i++;
		}

		iter.next = iter.next.next;
		this.length--;
		return true;
	}
}

/*
 * Adds an element to the end of the list
 */
LinkedList.prototype.add = function (data) {
	var iter = this.head;
	if(iter == null) {
		this.head = new ListNode(data);
	} else {
		while(iter.next != null) {
			iter = iter.next;
		}
		iter.next = new ListNode(data);
	}
	this.length++;
	return this.length;
}

/*
 * Adds an element to the start of the list (most effiecient)
 */
LinkedList.prototype.addFirst = function (data) {
	var tempNode = new ListNode(data);
	if(this.head == null) {
		this.head = tempNode;
	}
	else {
		tempNode.next = this.head;
		this.head = tempNode;
	}

	this.length++;
	return this.length;
}