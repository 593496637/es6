// 移除lazy懒加载，避免图标加载时触发Suspense导致双重Loading
import { ReactComponent as ArrowLeftIcon } from './svgs/arrow-left.svg';
import { ReactComponent as ArrowRightIcon } from './svgs/arrow-right.svg';
import { ReactComponent as AvatarIcon } from './svgs/avatar.svg';
import { ReactComponent as GlobalIcon } from './svgs/global.svg';
import { ReactComponent as LogoIcon } from './svgs/logo.svg';
import { ReactComponent as MenuIcon } from './svgs/menu.svg';
import { ReactComponent as SearchIcon } from './svgs/search.svg';

const icons = {
  'arrow-left': ArrowLeftIcon,
  'arrow-right': ArrowRightIcon,
  avatar: AvatarIcon,
  global: GlobalIcon,
  logo: LogoIcon,
  menu: MenuIcon,
  search: SearchIcon,
};

export default icons;