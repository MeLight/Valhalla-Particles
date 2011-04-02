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

LinkedList.prototype.list2string = function() {
	var str = '';
	var iter = this.head;
	while(iter != null) {
		str += iter.data + ", ";
		iter = iter.next;
	}

	return str;
}

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