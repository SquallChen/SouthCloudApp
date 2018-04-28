var vbody = new Vue({
	el: '#vbody',
	data: {
		option: [{
				key: 1,
				name: '南方卫星导航',
				value: 0
			},
			{
				key: 2,
				name: '设备初始激活组织',
				value: 1
			},
			{
				key: 3,
				name: '南方测绘集团总部',
				value: 2
			}
		],
		test: true,
		personnel: [{
				name: 'SG607A11723',
				status: 0,
				statustext: '激活',
				group: '南方卫星导航'
			},
			{
				name: 'SG607A11723',
				status: 0,
				statustext: '激活',
				group: '设备初始激活组织'
			}, {
				name: 'SG607A11723',
				status: 0,
				statustext: '激活',
				group: '南方卫星导航'
			},
			{
				name: 'SG607A11723',
				status: 0,
				statustext: '激活',
				group: '设备初始激活组织'
			},
			{
				name: 'SG607A11723',
				status: 0,
				statustext: '未激活',
				group: '南方测绘集团总部'
			},
			{
				name: 'SG607A11723',
				status: 1,
				statustext: '未激活',
				group: '南方测绘集团总部'
			},
			{
				name: 'SG607A11723',
				status: 1,
				statustext: '未激活',
				group: '南方测绘集团总部'
			},
			{
				name: 'SG607A11723',
				status: 1,
				statustext: '未激活',
				group: '南方测绘集团总部'
			},
			{
				name: 'SG607A11723',
				status: 1,
				statustext: '未激活',
				group: '南方测绘集团总部'
			},
			{
				name: 'SG607A11723',
				status: 1,
				statustext: '未激活',
				group: '南方测绘集团总部'
			},
			{
				name: 'SG607A11723',
				status: 1,
				statustext: '未激活',
				group: '南方测绘集团总部'
			}
		]
	},
	methods: {

	},
	created: function() {
		mui.plusReady(function() {
			mui.init({});
			mui('.details').on('tap', '.mui-table-view-cell', function(e) {
				var url = this.getAttribute('href');
				mui.openWindow({
					url: url,
					id: url
				});
			});
		});
	}
});