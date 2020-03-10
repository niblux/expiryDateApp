handleSubmit(e){ 
    e.preventDefault();
    const { value } = e.target;        

    this.setState({ isLoading: true });

    axios.post('/api/v1/items', {
        item: value
      })
      .then(response => {
        // there are several ways - choose ONE of them

        // 1. If server returns you the created item
        // you can just add this item into the list
        this.setState(prevState => {
               return {
                   items: [...prevState.items, response.data],
                   isLoading: false,
               }
        });

        // 2. But if there are any users who can make changing simultaneously with you 
        // (if not - just imagine it :) ) - it's better to make re-fetch data from server
        axios.get('/api/v1/items')
            .then(response => {
                this.setState(prevState => ({ items: response.data, isLoading: false }); 
            })
            .catch(err => { console.log('Something bad is happened:', err) });
}