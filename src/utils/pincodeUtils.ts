export async function getAddressFromPincode(pincode: string): Promise<string | null> {
  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await response.json();
    
    if (data[0].Status === 'Success') {
      const postOffice = data[0].PostOffice[0];
      return `${postOffice.Name}, ${postOffice.Division}, ${postOffice.District}, ${postOffice.State}, ${pincode}`;
    }
    return null;
  } catch (error) {
    console.error('Error fetching address:', error);
    return null;
  }
}

export function validatePincode(pincode: string): boolean {
  return /^[1-9][0-9]{5}$/.test(pincode);
}