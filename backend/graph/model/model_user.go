package model

type User struct {
	ID        string `json:"id"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	Username  string `json:"username"`
	Name      string `json:"name"`
	Role      string `json:"role"`
	Phone     string `json:"phone"`
	Gender    string `json:"gender"`
	Dob       string `json:"dob"`
	Picture   string `json:"picture"`
	Balance   int    `json:"balance"`
	IsBlocked bool   `json:"isBlocked"`
}
