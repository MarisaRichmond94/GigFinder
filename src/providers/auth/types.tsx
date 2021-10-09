export interface AuthContextType {
  companyName: string,
  isLoggedIn: boolean,
  userName: string,
  createCompanyAccount: (name: string) => void,
  createUserAccount: (name: string) => void,
  loginCompany: () => void,
  loginUser: () => void,
  logout: () => void,
}
