import Customizer from '../components/customizer';
import { BottomNav } from './components/bottom-nav';
import { LayoutContainer } from './components/layout-container';
import { LayoutRoot } from './components/layout-root';
import { TopNav } from './components/top-nav';

export const Layout = (props) => {
  const { pageTitle, children } = props;

  return (
    <>
      <TopNav pageTitle={pageTitle} />
      <Customizer />
      <BottomNav />
      <LayoutRoot>
        <LayoutContainer>
          {children}
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
};
