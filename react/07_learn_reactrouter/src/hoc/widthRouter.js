import { useNavigate, useParams, useLocation, useSearchParams } from 'react-router-dom';

export default function withRouter(WrapperComponent) {
  return function (props) {
    // 1.路由导航
    const navigate = useNavigate();
    // 2.动态路由参数
    const params = useParams();

    // 3.路由信息
    const location = useLocation();
    // 4.路由查询参数
    const [searchParams] = useSearchParams();
    // 将searchParams转换为对象：searchParams是URLSearchParams对象，需要转换为对象,URLSearchParams实现了Iterator接口，所以可以使用Object.fromEntries()方法转换为对象
    const query = Object.fromEntries(searchParams);

    // 路由对象
    const router = {
      navigate,
      params,
      location,
      query,
    };
    return <WrapperComponent {...props} router={router} />;
  };
}