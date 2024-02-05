import LoadingView from '@/components/other/LoadingView';
import { IUser, UserProfile } from '@/utils/types/user.type';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

interface UserContextProps {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  profile: UserProfile | null;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

const UserContext = React.createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  profile: null,
  setProfile: () => {},
});

export const useUser = () => React.useContext(UserContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<IUser | null>(null);
  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  const [loading, setLoading] = React.useState(false);
  const { pathname } = useRouter();

  const getProfile = async () => {
    const token = getCookie('token');
    if (!token) return;
    setLoading(true);
    if (!pathname.startsWith('/gaming')) return setLoading(false);
    try {
      const response = await fetch('http://194.163.167.131:6543/api/v1/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await response.json();
      const data = res.data;
      setUser(data.user);
      setProfile(data.person);
    } catch (error) {
      console.log(error);
      deleteCookie('token');
    }
    setLoading(false);
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) return <LoadingView />;

  return <UserContext.Provider value={{ user, setUser, profile, setProfile }}>{children}</UserContext.Provider>;
};

export default UserProvider;
