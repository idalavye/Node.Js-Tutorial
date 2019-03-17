const deleteProduct = (btn) => {
    const prodId = btn.parentNode.querySelector('[name=productId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

    /**
     * Şu anda body ile json veri göndermeye çalışırsam backend de bunu encode etmem gerekecekti.
     * Çünlü bodyparser metodunda urlencode kullandık. Bu gelen verileri sadece text olarak alır.
     */
    //fetch browser tarafından otomatik olarak sunulur.
    fetch('/admin/product/' + prodId, {
        method: 'DELETE',
        headers: {
            'csrf-token': csrf
        }
    }).then(result => {
        console.log(result);
    }).catch(err => console.log(err));
};