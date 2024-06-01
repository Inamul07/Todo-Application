package com.inamul.todo.service;

import com.inamul.todo.model.User;
import com.inamul.todo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public User getUser(int userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.orElse(null);
    }

    public void deleteUser(int userId) {
        userRepository.deleteById(userId);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
