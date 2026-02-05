import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useMember } from '@/integrations';

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export function LoginPromptModal({
  isOpen,
  onClose,
  title = 'Sign in required',
  message = 'Please sign in to save your progress and use this feature.',
}: LoginPromptModalProps) {
  const { actions } = useMember();

  const handleSignIn = () => {
    onClose();
    actions.login();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-light-text dark:text-dark-text">
            {title}
          </DialogTitle>
          <DialogDescription className="text-light-text-secondary dark:text-dark-text-secondary text-base mt-2">
            {message}
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 mt-6">
          <Button
            onClick={onClose}
            className="flex-1 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text border border-light-border dark:border-dark-border hover:bg-light-border dark:hover:bg-dark-border"
          >
            Continue Browsing
          </Button>
          <Button
            onClick={handleSignIn}
            className="flex-1 bg-primary text-white hover:bg-primary-hover"
          >
            Sign In
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
