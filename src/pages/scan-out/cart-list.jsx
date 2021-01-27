
import CartList from '../../component/cart/CartList';
import Alert from '../../component/layout/Alert';
import Body from '../../component/layout/Body';
import Footer from '../../component/layout/Footer';
import Loading from '../../component/layout/Loading';
import Header from './../../component/layout/Header';

export default function cartList() {
    return (
        <>
            <Header title="Cart List" />
            <Body>
                {/* <ProtectedContent url={`scan-out/cart-list`} /> */}
                <div className="row">
                    <div className="col-md-12">
                        <Alert />
                        <Loading color="info" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <CartList />
                    </div>
                </div>
            </Body>
            <Footer />
        </>
    )
}
