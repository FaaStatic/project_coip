import { AlertDialog, AlertDialogContent } from '@untr/apps-coip/lib/components/ui/alert-dialog';
import { useState } from 'react';
import ContentChooseUser from './components/ContentChooseUser';
import NoticeFailDeleteUser from './components/NoticeFailDeleteUser';

type chooseUserProp = {
  isOpen: boolean;
  setIsOpen: (data: boolean) => void;
  isLogin: boolean;
};

const ChooseUserLogin = ({ isOpen, setIsOpen, isLogin }: chooseUserProp) => {
  const [deleteUserFail, setDeleteUserFail] = useState<boolean>(false);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent
        className={`px-[20px] py-[12px] h-fit pt-2 pb-2 flex-col w-9/12 rounded-md bg-white`}
      >
        {!deleteUserFail && (
          <ContentChooseUser
            setIsOpen={setIsOpen}
            isLogin={isLogin}
            setDeleteUserFail={setDeleteUserFail}
          />
        )}
        {deleteUserFail && (
          <NoticeFailDeleteUser
            callback={setDeleteUserFail}
            setIsOpen={setIsOpen}
            isLogin={isLogin}
          />
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ChooseUserLogin;
