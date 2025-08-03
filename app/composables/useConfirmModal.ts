interface ConfirmProps {
  title: string;
  desc: string;
  icon: string;
}

const isOpen = ref(false);
const isConfirmed = ref<((value: boolean) => void) | null>(null);

const confirmProps = ref<ConfirmProps>({
  title: 'Confirm Action',
  desc: 'Are you sure you want to perform this action?',
  icon: 'i-lucide-info'
});

export const useConfirmModal = () => {
  function confirm(props: ConfirmProps) {
    if (props) {
      confirmProps.value = props;
    }
    isOpen.value = true;
    return new Promise((resolve) => {
      isConfirmed.value = resolve;
    });
  }

  function handleConfirm() {
    isOpen.value = false;
    isConfirmed.value?.(true);
  }

  function handleCancel() {
    isOpen.value = false;
    isConfirmed.value?.(false);
  }

  return {
    isOpen,
    isConfirmed,
    confirmProps,
    confirm,
    handleConfirm,
    handleCancel
  };
};
