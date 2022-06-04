let myVue = new Vue({
	el: '#app',
	data: {
		coloredCards: [
			'rgb(0,175,100)',
			'rgb(0,175,125)',
			'rgb(0,175,150)',
			'rgb(0,175,175)',
			'rgb(0,175,200)',
			'rgb(0,175,225)',
			'rgb(0,175,250)',
		],
		weeklyTodos: {
			"monday": [{
				todo: 'Clean bedroom',
				color: '#ef9a9a',
			},{
				todo: 'clean living room',
				color: '#f48fb1',
			}],
			"tuesday": [{
				todo: 'Clean kitchen',
				color: '#ce93d8',
			},{
				todo: 'Take out trash',
				color: '#90caf9',
			},{
				todo: 'Try out cake recipe',
				color: '#80deea',
			}],
			"wednesday": [
			],
			"thursday": [{
				todo: 'Get done homework',
				color: '#80cbc4',
			}],
			"friday": [{
				todo: 'Learn for maths',
				color: '#a5d6a7',
			},{
				todo: 'Learn for chemistry',
				color: '#c5e1a5',
			}],
			"saturday": [{
				todo: 'Do this',
				color: '#e6ee9c',
			},{
				todo: 'Do that',
				color: '#ffe082',
			},{
				todo: 'Do whatever you said',
				color: '#ffcc80',
			}],
			"sunday": [{
				todo: 'Do nothing!',
				color: '#ffab91',
			}],
		}
	}
})

const swappable = new Draggable.Swappable(
	document.querySelectorAll('[swappable]'), {
		draggable: '[swapItem]',
		delay: 0,
	}
)
swappable.on('drag:start', () => {
	console.log('drag:start')
})
swappable.on('swappable:swapped', () => {
	console.log('drag:swapped')
})
swappable.on('drag:stop', () => {
	console.log('drag:stop')
})
swappable.on('drag:move', () => {
	console.log('drag:move')
})

const sortable = new Draggable.Sortable(
	document.querySelectorAll('[sortable]'), {
		draggable: '[sortItem]',
		delay: 0,
	}
)
sortable.on('drag:start', () => {
	console.log('drag:start')
})
sortable.on('drag:stop', () => {
	console.log('drag:stop')
})