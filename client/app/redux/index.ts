// import { fetchCurrentUser } from "../actions/getCurrentUser";
// import { setUser } from "./userSlice";
// import { wrapper } from "./store"; // next-redux-wrapper kullanarak store'u sarıyoruz
// import RootLayout from "../layout"; // RootLayout bileşenini import ediyoruz

// const Home = ({ user }:any) => {
//   return (
//     <RootLayout user={user}>
//       {/* Sayfanızın içerikleri burada */}
//     </RootLayout>
//   );
// };

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (context) => {
//     const user = await fetchCurrentUser();
//     store.dispatch(setUser(user as any));
//     return { props: { user } };
//   }
// );

// export default Home;
