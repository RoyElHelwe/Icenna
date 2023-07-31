import Customizer from '../components/customizer';
import { BottomNav } from './components/bottom-nav';
import { LayoutContainer } from './components/layout-container';
import { LayoutRoot } from './components/layout-root';
import { TopNav } from './components/top-nav';

export const DoctorLayout = (props) => {
  const { children } = props;

  return (
    <>
      <TopNav pageTitle="Doctor" />
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
