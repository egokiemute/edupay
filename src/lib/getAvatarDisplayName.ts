const getAvatarDisplayName = (firstname: string, lastname: string) => {
    const firstLetter = firstname?.[0] || '';
    const lastLetter = lastname?.[0] || '';
    return (firstLetter + lastLetter).toUpperCase();
  };
  