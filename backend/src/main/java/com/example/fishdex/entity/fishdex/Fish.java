package com.example.fishdex.entity.fishdex;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
public class Fish {

    @Id
    @Column(name="fish_id")
    private Long id;
    private String species;

}
