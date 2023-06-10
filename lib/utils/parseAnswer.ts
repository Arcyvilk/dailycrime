export const parseAnswer = (response: any) => {
    const data = response.data;
    const regex = new RegExp(/(?<=data: )(.*?)$/gmi)
    const match = data.match(regex);
    
    const answer = match?.join('+').toUpperCase() ?? 'INVALID'
    
    if (answer?.includes('[+Y+]')) return 'YES'
    if (answer?.includes('[+N+]')) return 'NO'
    if (answer?.includes('[+I+]')) return 'INVALID'
    
    // If answer is none of those, log why 
    return answer
}