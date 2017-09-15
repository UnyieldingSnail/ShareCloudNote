function cancleBubble(e) {
	if (e.stopPropagation) {
		e.stopPropagation()
	} else {
		e.cancleBubble = true;
	}
}