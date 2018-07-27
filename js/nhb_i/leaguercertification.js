mui.init({
	beforeback: function(){
		var i = plus.webview.getWebviewById('nhb_html_i/nhb_i.html');
		mui.fire(i,'refresh');
		plus.webview.currentWebview().close();
		return true;
	}
});

		
		var category = new mui.PopPicker({
			layer: 1
		});
		category.setData([{
					value: 'ywj',
					text: '董事长 叶文洁'
				}, {
					value: 'aaa',
					text: '总经理 艾AA'
				}, {
					value: 'lj',
					text: '罗辑'
				}, {
					value: 'ymt',
					text: '云天明'
				}, {
					value: 'shq',
					text: '史强'
				}, {
					value: 'zhbh',
					text: '章北海'
				}, {
					value: 'zhy',
					text: '庄颜'
				}]);
		$('#category').on('tap', function() {
			category.show(function(items) {
				$('#category').text(items[0].text)
			});
		});
		var cityPicker = new mui.PopPicker({
			layer: 3
		});
		cityPicker.setData(cityData3);
		$('#province').on('tap', function() {
			cityPicker.show(function(items) {
				$('#province').text(items[0].text + " " + items[1].text+ " " + items[2].text)
			});
		});
