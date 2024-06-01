package com.inamul.todo.controller;

import com.inamul.todo.model.User;
import com.inamul.todo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000/")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/get-all-users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUser(@PathVariable int userId) {
        User user = userService.getUser(userId);
        if(user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @PostMapping("/insert-user")
    public ResponseEntity<String> insertUser(@RequestBody User user) {
        try {
            userService.saveUser(user);
        } catch (Exception e) {
            return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Insertion Successful", HttpStatus.OK);
    }

    @PutMapping("/update-user/{userId}")
    public ResponseEntity<String> updateUser(@RequestBody User user, @PathVariable int userId) {
        User existingUser = userService.getUser(userId);
        if(existingUser == null) {
            return new ResponseEntity<>("User Not Found", HttpStatus.NOT_FOUND);
        }
        try {
            userService.saveUser(user);
        } catch (Exception e) {
            return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Update Successful", HttpStatus.OK);
    }

    @DeleteMapping("/delete-user/{userId}")
    public String deleteUser(@PathVariable int userId) {
        userService.deleteUser(userId);
        return "Deletion Successful";
    }

    @PostMapping("/login")
    public ResponseEntity<Integer> loginUser(@RequestBody User user) {
        User existingUser = userService.getUserByEmail(user.getEmail());
        if(existingUser == null || !existingUser.getPassword().equals(user.getPassword())) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(existingUser.getUserId(), HttpStatus.OK);
    }
}
