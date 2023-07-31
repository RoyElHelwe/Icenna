import Customizer from '../components/customizer';
import { LayoutContainer } from './components/layout-container';
import { LayoutRoot } from './components/layout-root';
import { TopNav } from './components/top-nav';

export const Layout = (props) => {
  const { children } = props;

  return (
    <>
      <TopNav />
      <Customizer />
      <LayoutRoot>
        <LayoutContainer>
          {children}
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
};
