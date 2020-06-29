define([], function () {
    var script = function () {
        var watch = this.watch, getValue = this.getValue, setValue = this.setValue, setStatus = this.setStatus;
        //1、(2)中“CBX固定式真空接触器(P=150mm)”在(1)中选择“CBX3-O2”时默认选此项。
        //(2)中“CVX手车式真空接触器(P=150mm)”在(1)中选择“CVX-O2”时默认选此项。
        watch('productSerialize').change(function (selectedValue) {
            setValue('installMethod', {
                'CBX3-O²': 'CBX固定式真空接触器(P=150mm)',
                'CVX-O²': 'CVX手车式真空接触器(P=150mm)'
            }, selectedValue);
            setStatus('installMethod', 'readonly', true);
        });
        //2、当(8)选择“电保持（E）”时，(10)项不可选；当(8)选择“机械保持（M）”时，(10)项为必选。
        watch('keepMethod').change(function (selectedValue) {
            if (selectedValue == '电保持(E)') {
                setValue('trippingCoilHC', null, '');
                setStatus('trippingCoilHC', 'readonly', true);
                setStatus('trippingCoilHC', 'required', false);
            }
            else if (selectedValue == '机械保持(E)') {
                setStatus('trippingCoilHC', 'readonly', false);
                setStatus('trippingCoilHC', 'required', true);
            }
            else {
                setStatus('trippingCoilHC', 'readonly', false);
            }
        });
        //3、当(4)选择“IEC 60470”时，(12)项默认选“英文”；(4)选择“GB/T 14808”时，(12)项默认选“中文”。
        watch('standard').change(function (selectedValue) {
            setValue('reportLang', {
                'IEC 60470': '英文',
                'GB/T 14808': '中文'
            }, selectedValue);
        });
        //4、(1)- (5)，(7)- (9)，(11)- (12)为必选项。(5) (7)默认选择唯一项。
        /*===============直接设置schema 的 required 与 default 值 ============================================*/
        //5、当(1)中选择“CVX-O2”时，(6)，(13)，(15)- (18)为必选项，(16)默认选择唯一项。
        //(14)在(13)项中选择“电动推进(需额外收费)”时为必选，在(13)项中选择“手动推进”时不可选。
        //当(1)中选择“CBX3-O2”时，(6)，(13)- (18)不可选。
        watch('productSerialize').change(function (selectedValue) {
            if (selectedValue == 'CVX-O²') {
                setStatus('maxCurrent', 'required', true);
                setStatus('vehicleType', 'required', true);
                setStatus('groundingMethod', 'required', true);
                setStatus('breakType', 'required', true);
                setStatus('breakMaxCurrent', 'required', true);
                setStatus('lockMode', 'required', true);
                setStatus('maxCurrent', 'readonly', false);
                setStatus('vehicleType', 'readonly', false);
                setStatus('groundingMethod', 'readonly', false);
                setStatus('breakType', 'readonly', false);
                setStatus('breakMaxCurrent', 'readonly', false);
                setStatus('lockMode', 'readonly', false);
            }
            else if (selectedValue == 'CBX3-O²') {
                setStatus('maxCurrent', 'required', false);
                setStatus('vehicleType', 'required', false);
                setStatus('groundingMethod', 'required', false);
                setStatus('breakType', 'required', false);
                setStatus('breakMaxCurrent', 'required', false);
                setStatus('lockMode', 'required', false);
                //(6)，(13)- (18)不可选
                setStatus('maxCurrent', 'readonly', true);
                setStatus('vehicleType', 'readonly', true);
                setStatus('groundingMethod', 'readonly', true);
                setStatus('breakType', 'readonly', true);
                setStatus('breakMaxCurrent', 'readonly', true);
                setStatus('lockMode', 'readonly', true);
                //(6)，(13)- (18) 清空值
                setValue('maxCurrent', null);
                setValue('vehicleType', null);
                setValue('groundingMethod', null);
                setValue('breakType', null);
                setValue('breakMaxCurrent', null);
                setValue('lockMode', null);
            }
        });
        //(14)在(13)项中选择“电动推进(需额外收费)”时为必选，在(13)项中选择“手动推进”时不可选。
        watch('vehicleType').change(function (selectedValue) {
            if (getValue('productSerialize') == 'CVX-O²' && selectedValue == "电动推进(需额外收费)") {
                setStatus('vehicleTypeCurrent', 'required', true);
                setStatus('vehicleTypeCurrent', 'readonly', false);
            }
            else if (getValue('productSerialize') == 'CVX-O²' && selectedValue == "手动推进") {
                setStatus('vehicleTypeCurrent', 'required', false);
                setValue('vehicleTypeCurrent', null);
                setStatus('vehicleTypeCurrent', 'readonly', true);
            }
        });
        //6、当(1)选择“CVX-O2”，(3)选择“7.2kV”时，(6)默认选“250A(7.2kV)”，(17)默认选“315A(7.2 kV)”。
        //当(1)选择“CVX-O2”，(3)选择“12kV”时，(6)默认选“160A(12kV)”，(17)默认选“200A(12 kV)”。
        watch('ratedVoltage').change(function (selectedValue) {
            if (getValue('productSerialize') == 'CVX-O²') {
                setValue('maxCurrent', {
                    '7.2kV': '250A(7.2kV)',
                    '12kV': '160A(12kV)'
                }, selectedValue);
                setValue('breakMaxCurrent', {
                    '7.2kV': '315A(7.2 kV)',
                    '12kV': '200A(12 kV)'
                }, selectedValue);
            }
        });
    };
    return script;
});
